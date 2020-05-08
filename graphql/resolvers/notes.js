const Note = require('../../models/note');
const checkAuth = require('../../utils/check-auth');
const { AuthentactionError } = require('apollo-server');
module.exports = {
    Query: {

        async getNotes(_, { username }) {

            try {
                const notes = await Note.find({ username }).sort({ createdAt: -1 });
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

    },
    Mutation: {
        async createNote(_, { content }, context) {
            const user = checkAuth(context);

            const newNote = new Note({
                content,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                grouped: false,
                groupId: 'none'
            });
            const note = await newNote.save();

            context.pubsub.publish('NEW_NOTE', {
                newNote: note
            });

            return note;
        },
        async deleteNote(_, { noteId }, context) {

            const user = checkAuth(context);

            try {
                const note = await Note.findById(noteId);
                if (user.username = note.username) {
                    await note.delete();
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
                    return note;
                } else {
                    throw new Error('note Doesnt exist');
                }

            } catch (err) {
                throw new Error(err);
            }
        },
        async createGroupedNote(_,{content,groupId},context){
            const user = checkAuth(context);

            const newNote = new Note({
                content,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
                grouped: true,
                groupId:groupId
            });
            const note = await newNote.save();

            context.pubsub.publish('NEW_NOTE', {
                newNote: note
            });

            return note;

        },
        async deleteGroupNotes(_,{groupId}){

            try {
                const notes= await Note.find({groupId:groupId});
                
                    await notes.delete();
                    return notes;

               
            } catch (err) {
                throw new Error(err);
            }
            
        }
    },
    Subscription: {
        newNote: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_NOTE')
        }
    }
};