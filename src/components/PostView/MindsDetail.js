import React from 'react';
import MindsBar from '../MindsBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import commentGreen from '/public/images/commentGreen.png';
import commentWhite from '/public/images/commentWhite.png';
import bookmarkGreen from '/public/images/bookmarkGreen.png';
import bookmarkWhite from '/public/images/bookmarkWhite.png';
import likeGreen from '/public/images/likeGreen.png';
import likeWhite from '/public/images/likeWhite.png';
import hateGreen from '/public/images/hateGreen.png';
import hateWhite from '/public/images/hateWhite.png';

const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px;

    width: 1124px;
    height: 835px;

    background: #71af8a;
    margin: 100px auto;
    box-shadow: 2px 2px 20px rgba(113, 175, 138, 0.5);
    border-radius: 50px;

    position: relative;
`;
const Card = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    height: 800px;

    color: #4e705b;
    background: #fff;
    border-radius: 50px;
`;
const IdBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 30px;
    margin-bottom: 30px;
    gap: 10px;

    width: 888px;
    height: 6px;
    text-align: left;
    background: #ffffff;
    box-shadow: 2px 2px 7px rgba(113, 175, 138, 0.5);
    border-radius: 50px;
    color: #4e705b;

    position: relative;
    top: 50px;
    left: 50px;
`;
const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;

    color: #4e705b;
    font-size: 1em;
    background: #fff;
    box-shadow: 0px 2px 10px rgba(113, 175, 138, 0.5);
    border-radius: 30px;
    border: none;

    &:hover {
        background: #71af8a;
        color: #fff;
    }
`;
const CommentBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 30px;
    margin: 0 auto;
    gap: 10px;

    width: 1124px;

    background: #71af8a;
    box-shadow: 2px 2px 20px rgba(113, 175, 138, 0.5);
    border-radius: 50px;

    flex: none;
    order: 0;
    flex-grow: 0;

    font-family: 'Montserrat Alternates';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
`;
const Comment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 20px auto;
    width: 1174px;
    height: 250px;

    color: #4e705b;
    background: #ffffff;
    box-shadow: 2px 2px 20px rgba(113, 175, 138, 0.5);
    border-radius: 50px;
    position: relative;
`;
const CommentAdd = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    margin: 30px auto;
    gap: 10px;
    width: 1124px;

    background: #fff;
    box-shadow: 2px 2px 20px rgba(113, 175, 138, 0.5);
    border-radius: 50px;

    flex: none;
    order: 0;
    flex-grow: 0;

    font-family: 'Montserrat Alternates';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #4e705b;

    &:hover {
        background: #71af8a;
        color: #fff;
    }
`;
const PaginationBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    margin: 40px auto;
    width: 526px;
    height: 52px;
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(113, 175, 138, 0.5);
    border-radius: 30px;
    padding: 10px;
    color: #4e705b;
`;

// const host = 'http://3.38.52.33:8080/minds';
// const fetcher = (url) =>
//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-host': host,
//             'x-rapidapi-key': '1',
//             useQueryString: true,
//         },
//     }).then((res) => res.json());
const host = instance.get('/minds/1');
const fetcher = (host) => host.then((res) => res.data);

function MindsDetail() {
    const [isCommentHover, setIsCommentHover] = useState(false);
    const [isBookmarkHover, setIsBookmarkHover] = useState(false);
    const [isLikeHover, setIsLikeHover] = useState(false);
    const [isHateHover, setIsHateHover] = useState(false);

    // const fetcher = async (instance) => {
    //   const res = await fetch(instance);
    //   const data = res.json();
    //   return data;
    // };
    // const { data } = useSWR('http', fetch);
    const route = useRouter();
    console.log(route.query.id);

    let url = 'http://3.38.52.33:8080/minds/' + route.query.id;
    const { data, error } = useSWR(host, fetcher);
    if (error) return '에러발생';
    if (!data) return '로딩중..';
    console.log(data.comments);
    const date = new Date(data.createdAt).toISOString().split('T')[0];
    return (
        <>
            <MindsBar category={data.category} />
            <CardTitle>
                <p
                    style={{
                        margin: '0 auto',
                        color: '#fff',
                        fontFamily: 'Montserrat Alternates',
                        fontWeight: '600',
                        fontSize: '25px',
                    }}
                >
                    {data.title}
                    {/* 2022년 3월 고1 수학 모의고사 30번 질문합니다 */}
                </p>
                <Card>
                    <IdBox>
                        <img
                            src="/images/profile.png"
                            width={45}
                            alt="프사"
                            style={{ position: 'absolute', left: '15px' }}
                        />
                        <span style={{ position: 'absolute', left: '60px' }}>
                            {data.user}
                        </span>
                        <span style={{ position: 'absolute', right: '15px' }}>
                            {date}
                        </span>
                    </IdBox>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'absolute',
                            right: '60px',
                            top: '50px',
                        }}
                    >
                        <Button
                            onMouseOver={() => setIsCommentHover(true)}
                            onMouseOut={() => setIsCommentHover(false)}
                            style={{ width: '60px' }}
                        >
                            <img
                                width="20px"
                                src={
                                    isCommentHover
                                        ? commentWhite.src
                                        : commentGreen.src
                                }
                                alt="댓글"
                                style={{ margin: '0 3px 0 0' }}
                            />
                            {data.comments.length}
                        </Button>
                        <Button
                            onMouseOver={() => setIsBookmarkHover(true)}
                            onMouseOut={() => setIsBookmarkHover(false)}
                        >
                            <img
                                width="20px"
                                src={
                                    isBookmarkHover
                                        ? bookmarkWhite.src
                                        : bookmarkGreen.src
                                }
                                alt="북마크"
                            />
                        </Button>
                    </div>
                    <p style={{ position: 'static', margin: '80px 0 0  50px' }}>
                        {data.mindDetails}
                    </p>
                    <img
                        src="/images/sample.png"
                        style={{ width: '65%', margin: '10px 50px' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'absolute',
                            bottom: '30px',
                            right: '50px',
                        }}
                    >
                        <Button style={{ padding: '14px 20px' }}>
                            수정하기
                        </Button>
                        <Button style={{ padding: '14px 20px' }}>
                            삭제하기
                        </Button>
                    </div>
                </Card>
            </CardTitle>
            <CommentBar>
                <img
                    width="20px"
                    src={commentWhite.src}
                    alt=""
                    style={{ margin: '0 3px 0 0' }}
                />
                답변
                <span>{data.comments.length}</span>
            </CommentBar>
            {data.comments.map((item) => (
                <Comment>
                    <IdBox style={{ width: '860px' }}>
                        <img
                            src="/images/profile.png"
                            width={45}
                            style={{ position: 'absolute', left: '15px' }}
                        />
                        <span style={{ position: 'absolute', left: '60px' }}>
                            {item.user}
                        </span>
                        <span style={{ position: 'absolute', right: '15px' }}>
                            {item.createdAt}
                        </span>
                    </IdBox>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'absolute',
                            right: '60px',
                            top: '50px',
                        }}
                    >
                        <Button
                            onMouseOver={() => setIsLikeHover(true)}
                            onMouseOut={() => setIsLikeHover(false)}
                            style={{ width: '60px' }}
                        >
                            <img
                                src={
                                    isLikeHover ? likeWhite.src : likeGreen.src
                                }
                                alt="좋아요"
                                style={{ margin: '0 3px 0 0' }}
                            />
                            {item.like}
                        </Button>
                        <Button
                            onMouseOver={() => setIsHateHover(true)}
                            onMouseOut={() => setIsHateHover(false)}
                            style={{ width: '60px' }}
                        >
                            <img
                                src={
                                    isHateHover ? hateWhite.src : hateGreen.src
                                }
                                alt="싫어요"
                                style={{ margin: '0 3px 0 0' }}
                            />
                            {item.unlike}
                        </Button>
                    </div>
                    <p style={{ position: 'static', margin: '30px 0 0  50px' }}>
                        {item.commentDetail}
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'absolute',
                            bottom: '50px',
                            right: '50px',
                        }}
                    >
                        <Button style={{ padding: '14px 20px' }}>
                            수정하기
                        </Button>
                        <Button style={{ padding: '14px 20px' }}>
                            삭제하기
                        </Button>
                    </div>
                </Comment>
            ))}
            <CommentAdd>+ 댓글 작성</CommentAdd>
            <PaginationBox>
                <span>이전글</span>/<span>다음글</span>
            </PaginationBox>
        </>
    );
}
export default MindsDetail;