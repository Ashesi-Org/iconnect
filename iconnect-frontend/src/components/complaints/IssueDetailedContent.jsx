import React, { useContext, useState } from 'react';
import moment from 'moment'
import EmojiPicker from 'emoji-picker-react';
import { Smile, XCircle } from 'lucide-react';
import { userContext } from '../../contexts/UserContext';
import { api } from '../../api';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import ButtonM from '../ui/ButtonM';
import { getPriorityIndicator, getStatusIndicator } from './ComplaintStatusIndicator';
import AppDialog from '../ui/AppDialog';
import CloseIssue from './CloseIssue';

const IssueDetailedContent = ({ issue }) => {
    console.log("issue, ", issue)
    const { user: current_user } = useContext(userContext);
    const isAdmin = current_user?.role === 'administrator';
    const [closeIssueVisible, setCloseIssueVisible] = useState(false);
    const {user} = useContext(userContext)
    const [comment, setComment] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to manage emoji picker visibility
        // const {} = issue;
    const handleEmojiClick = (event, emojiObject) => {
        const emojiToAdd = emojiObject ? emojiObject.emoji : event.currentTarget.textContent;
        if (emojiToAdd) {
            setComment(comment + emojiToAdd);
        }
    };

    const openCloseConfirmation = () => {
    setCloseIssueVisible(true);

  };
   
    const closeIssueConfirmation = () => {
        setCloseIssueVisible(false);
    };

    const handleCommentSubmit = async () => {
        const newComment = {
            issue_id: issue?.issueid,
            user_id: user?.userId,
            comment_text: comment,
        }

        try{
            const response = await api.post('/api/comments', newComment)
            if(response.data.success){
                toast.success(`Added comment # ${response.data.comment.comment_id}`)
            }
            else if(!response.data.success){
                toast.error(response.data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error('Cant add comment at the moment')
        }
        setComment('');
        setShowEmojiPicker(false); // Hide emoji picker after comment submission
    };


    return (
        <div className="bg-white shadow rounded-md ">
            
            <div className="flex flex-col items-center gap-1 flex-grow">
                <div className="flex justify-between w-full flex-col">
                    <h1 className="text-3xl font-semibold mb-2 text-start">{issue?.title ?? ''} #{issue?.issueid}</h1>
                    <p className="text-gray-600 mb-1">
                    Created on {moment(issue?.issue_created_at).format('LLL')}
                    </p>
                </div>
                <div className="flex items-center justify-between w-full pb-1">
                    <div className="flex items-center">
                        <p className="text-gray-600 mb-1 gap-3 flex ">
                        {getStatusIndicator(issue?.status)}
                        {getPriorityIndicator(issue?.priority)}
                        </p>
                    </div>
                    <div className="flex ml-auto">
                        
                        {isAdmin ? issue?.status === 'closed'?
                         <button  className="ml-auto px-4 py-1 bg-slate-500 text-white rounded-md cursor-not-allowed " disabled >
                           complaint closed
                        </button> :
                        <button className="ml-auto px-4 py-1 bg-app-brown text-white rounded-md " onClick={() => openCloseConfirmation()}>
                        Close Issue
                        </button> :  ""
                         }
                    </div>
                </div>
            </div>

            {/* Comments section */}
            <div className="border-t border-gray-200 pt-6">
                  <div  className="mb-6">
                        <div className="flex items-center">
                            <img
                                src={issue?.avatar_url}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <div className="flex flex-col flex-grow border border-gray-200 rounded-md ">
                                <div className="flex items-center justify-between mb-2 bg-app-background-2">
                                    <p className="text-gray-600 p-5" >
                                        {issue?.display_name} created{' '}
                                        {moment(issue?.issue_created_at).fromNow()}

                                    </p>
                                    
                                </div>
                                <div className="flex justify-center items-center flex-col p-5">

                                    <p className=" text-gray-800">{issue?.description}</p>
                                    {issue?.attachment_url &&
                                    <img width={300} height={300} src={issue?.attachment_url ?? ""}/>   
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                <h2 className="text-xl font-semibold mb-4">Comments ({issue?.comments?.length})</h2>
                {issue?.comments?.map((comment) => (
                    <div key={comment.comment_id} className="mb-6">
                        <div className="flex items-center">
                            <img
                                src={comment.creator_avatar_url}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <div className="flex flex-col flex-grow border border-gray-200 rounded-md ">
                                <div className="flex items-center justify-between mb-2 bg-app-background-2">
                                    <p className="text-gray-600 p-5" >
                                        {comment.creator_display_name} commented{' '}
                                        {moment(comment.comment_created_at).fromNow()}

                                    </p>
                                    <div className="relative inline-block text-gray-500 focus-within:text-blue-600 ">
                                        <button className="focus:outline-none">
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 10a2 2 0 100-4 2 2 0 000 4zM6 10a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md py-1 z-10 hidden">
                                            <button className="block px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-100">
                                                Quote Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[100px]">

                                    <p className="m-5 text-gray-800">{comment.comment_text}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))}

                {

                closeIssueVisible &&
                    <AppDialog
                        defaultOpen={closeIssueVisible}
                        open={closeIssueVisible}
                        setOpenChange={closeIssueConfirmation}
                        content={
                        <>
                        <CloseIssue  issueToClose={issue} closeIssueConfirmation={closeIssueConfirmation}/>
                        </>
                        }
                    ></AppDialog>
                }

            </div>
            <div className="mt-8 flex flex-col">
                <h2 className="text-xl font-md mb-4">Commenting as</h2>
                <div className='flex items-center'>


                 <img
                                src={current_user?.avatarUrl}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                <textarea
                    className="w-full bg-app-background-2 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-app-brown"
                    rows="4"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                </div>

                {/* Conditional rendering for emoji icon and picker */}
                <div className="flex justify-between items-center mt-4">
                    {/* Emoji icon */}
                    <button
                        className="flex items-center text-gray-500 focus:outline-none"
                    >
                        <Smile size={20} className="mr-2 focus:outline-blue hover:text-blue-500" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/> {/* Replace with your emoji icon */}
                        <span>Add Emoji</span>
                    </button>

                    {/* Emoji picker */}
                    {showEmojiPicker && (
                        <div className="absolute z-10">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                            <XCircle size={20} className="absolute right-0 mr-2 focus:outline-blue hover:text-app-brown cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                        </div>
                    )}

                    <ButtonM
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleCommentSubmit}
                    >
                        Comment
                    </ButtonM>   
                </div>
            </div>

        </div>
    );
};

export default IssueDetailedContent;