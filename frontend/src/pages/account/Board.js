import React from 'react'
import PostList from "../../components/PostList";
import Layout from "../../components/Layout";

const Board = (props) => {
    const boardName = props.match.params.boardname;
    return (
        <Layout props={props}>
            <div className="max-w-screen-md mx-auto my-10">
                <h1 className="text-2xl font-bold">{boardName}</h1>
            </div>
            <PostList filter={`boards__title=${boardName}`}/>
        </Layout>
    )
}; export default Board
