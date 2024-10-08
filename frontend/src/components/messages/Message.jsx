// import { useAuthContext } from "../../hooks/authContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";
import PropTypes from 'prop-types';

import { useAuthContext } from "../../hooks/authContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
	const {authUser}=useAuthContext();
	const {selectedConversation}=useConversation();
	const fromMe=message.senderId===authUser._id;
	const formattedTime=extractTime(message.createdAt);
	const chatClassName=fromMe ? 'chat-end':'chat-start';
	const profilePic=fromMe ? authUser.profilePic:selectedConversation?.profilePic;
	const bubbleBgColor=fromMe ? 'bg-blue-500':""
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
Message.propTypes = {
		message: PropTypes.shape({
			senderId: PropTypes.string.isRequired,
			message: PropTypes.string.isRequired, // The actual message text
			createdAt: PropTypes.string.isRequired,
			shouldShake: PropTypes.bool, // Optional boolean
		}),
	};
export default Message;