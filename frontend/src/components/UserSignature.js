import ProfilePicture from "./ProfilePicture";

export default function UserSignature({ user, includeFollowers }){

    return (
        <div className="flex items-center">
            <ProfilePicture user={user} size="1.5"/>
            <div className="ml-3">
                <div className={includeFollowers ? "font-bold" : ""}>{user.username}</div>
                {/*{ includeFollowers &&*/}
                {/*<div>{user.follower.length} followers</div>*/}
                {/*}*/}
            </div>
        </div>
    );
}
