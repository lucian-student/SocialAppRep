const Note = require('../../models/note');
const checkAuth = require('../../utils/check-auth');
const { AuthentactionError } = require('apollo-server');
const { withFilter, } = require('apollo-server');
const { validateCreateNote } = require('../../utils/validators');
const { UserInputError } = require('apollo-server');

const NEW_NOTE = 'NEW_NOTE';
const REMOVE_NOTE = 'REMOVE_NOTE';

module.exports = {
    Query: {

        async getNotes(_, { username }) {

            try {
                const notes = await Note.find({ username, grouped: false }).sort({ createdAt: -1 });
                return notes;
            } catch (err) {
                throw new Error(err);
            }

        },
        async getNote(_, { noteId }) {
            try {
                const note = await Note.findById(noteId);
                if (note) {
                    return note;
                } else {
                    throw new Error('note doesnt exist');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
        ,
        async getGroupedNotes(_, { groupId }) {
            try {
                const notes = await Note.find({ groupId: groupId }).sort({ createdAt: -1 });
                return notes;
            } catch (err) {
                throw new Error(err);
            }


        }
    }
    ,
    Mutation: {
        async createNote(_, { content, noteName }, context) {
            const user = checkAuth(context);

            const { errors, valid } = validateCreateNote(noteName);

            if (valid) {

                const newNote = new Note({
                    content,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    grouped: false,
                    groupId: 'none',
                    noteName: noteName
                });
                const note = await newNote.save();
                return note;
            } else {
                throw new UserInputError('not valid inputs', { errors });
            }
            /* context.pubsub.publish('NEW_NOTE', {
                 newNote: note
             });*/


        },
        async deleteNote(_, { noteId }, context) {

            const user = checkAuth(context);

            try {
                const note = await Note.findById(noteId);
                if (user.username = note.username) {
                    const groupId = note.groupId;
                    await note.delete();

                    context.pubsub.publish(REMOVE_NOTE, {
                        groupId: groupId,
                        removeNote: note
                    });


                    return 'note was deleted';

                } else {
                    throw new AuthentactionError('u havent got permission to do that');
                }
            } catch (err) {
                throw new Error(err);
            }

        },
        async editNote(_, { noteId, content }) {

            try {
                const note = await Note.findByIdAndUpdate(noteId, { content });


                if (note) {

                    //live update action here
                    /* context.pubsub.publish('NEW_NOTE', {
                         newNote: note
                     });*/
                    //end of live update action here

                    return note;


                } else {
                    throw new Error('note Doesnt exist');
                }

            } catch (err) {
                throw new Error(err);
            }
        },
        async createGroupedNote(_, { content, groupId, noteName }, context) {
            const user = checkAuth(context);

            const { errors, valid } = validateCreateNote(noteName);
            if (valid) {
                const newNote = new Note({
                    content,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    grouped: true,
                    groupId: groupId,
                    noteName: noteName
                });
                const note = await newNote.save();

                //live update action here
                // if it doesnt work add note.dataValues
                context.pubsub.publish(NEW_NOTE, {
                    groupId: groupId,
                    newNote: note
                });
                //end of live update action here


                return note;
            } else {
                throw new UserInputError('not valid inputs', { errors });
            }

        },
        async refetchQuery(_, __) {
            return "hello";
        }
    },
    Subscription: {
        newNote: {
            subscribe: withFilter(
                (_, __, { pubsub }) => pubsub.asyncIterator(NEW_NOTE),
                (payload, variables) => {
                    return payload.newNote.groupId === variables.groupId;
                },
            ),
        },
        removeNote: {
            subscribe: withFilter(
                (_, __, { pubsub }) => pubsub.asyncIterator(REMOVE_NOTE),
                (payload, variables) => {
                    return payload.removeNote.groupId === variables.groupId;
                },
            ),
        }
    }
};