
import React from 'react'
import userPhoto from "/src/assets/user-photo.jpg"

export default function Comment({ comment }) {
    return (
        <div>
            <div className="flex">
                <img onError={(e) => e.target.src = userPhoto} className=" rounded-full w-10 h-10 mr-3" src={comment.commentCreator.photo} alt />
                <div>
                    <h3 className="text-md font-semibold ">{comment.commentCreator.name}</h3>
                    <p className="text-xs text-gray-500">{comment.createdAt}</p>
                </div>
            </div>
            <p className='ps-12 pt-2'>{comment.content}</p>
        </div>
    )
}
