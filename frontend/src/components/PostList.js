import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Card} from "antd";

const apiRoot = 'http://localhost:8000/pins/'

const PostList = () => {
    const [postList, setPostList] = useState([])
    useEffect( () => {
        axios.get(apiRoot)
            .then((res) =>{
                const {data} = res
                setPostList(data)
            })
            .catch((err) => console.log(err))
    })
    return(
        <div>
            {postList.map((post, pk) => {
                return(
                    <div key={pk}>
                        <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={post.image} />}
                        >
                            <Card.Meta title={post.title}></Card.Meta>
                        </Card>
                        </div>
                )
            })}
        </div>
    )
}
export default PostList