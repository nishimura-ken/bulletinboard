import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"

type Post = {
    id: string
    post: string
}

const API_URL = "https://railway.bulletinboard.techtrain.dev/threads/"

function Thread() {
    const { thread_id } = useParams()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [newPost, setNewPost] = useState("")

    const location = useLocation()
    const title = location.state?.title

    // 最新の投稿一覧を取得する
    const getPosts = async () => {
        const response = await fetch(API_URL + thread_id + "/posts")

        if ( !response.ok ) {
            throw new Error("投稿情報の取得に失敗しました")
        }
        const data = await response.json()
        setPosts(data.posts)
    }

    //　副作用による処理
    useEffect(() => {
        if (!thread_id) {
            return
        }

        //　投稿一覧を取得
        getPosts()
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [thread_id])

    if (loading) {
        return <p>読み込み中...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    //　投稿ボタンを押したとき
    const postSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        if ( !newPost.trim() ) {
            alert("投稿内容を入力してください")
            return
        }

        try {
            const response = await fetch(API_URL + thread_id + "/posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        post: newPost,
                    }),
                }
            )

            if ( !response.ok ) {
                throw new Error("投稿に失敗しました")
            }

            //　投稿が成功したら、入力欄を空にする
            setNewPost("")

            //　最新の投稿一覧を取得しなおす
            await getPosts()

        } catch (error) {
            console.error(error)
            alert("投稿に失敗しました")
        }
    }

    return (
        <Fragment>
            <header>
                <h3>掲示板</h3>
                <Link to="/">スレッド一覧へ</Link>
            </header>
            <section id="center">
                <h4>{title}</h4>
                <div className="contents">
                    { posts.length === 0 ? (
                        <p>投稿がありません。</p>
                    ) : (
                        <div className="posts">
                            {posts.map((post) => (
                                <div className="post" key={post.id}>
                                    {post.post} 
                                </div>
                            ))}
                        </div>
                    )}
                    <form onSubmit={postSubmit}>
                        <textarea
                            value={newPost}
                            onChange={(event) => setNewPost(event.target.value)}
                            placeholder="投稿内容を入力してください"
                        />
                        <button type="submit">投稿する</button>
                    </form>
                </div>
                <div className="bottom">
                    <Link to="/">掲示板に戻る</Link>
                </div>
            </section>
        </Fragment>
    )
}

export default Thread