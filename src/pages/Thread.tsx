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

    const location = useLocation()
    const title = location.state?.title

    useEffect(() => {
        if (!thread_id) {
            return
        }

        //　投稿一覧を取得
        fetch(API_URL + thread_id + "/posts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("投稿情報の取得に失敗しました")
                }
                return response.json()
            })
            .then((data) => {
                setPosts(data.posts)
            })
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

    return (
        <Fragment>
            <header>
                <h3>掲示板</h3>
                <Link to="/">スレッド一覧へ</Link>
            </header>
            <section id="center">
                <h4>{title}</h4>
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
                <div className="bottom">
                    <Link to="/">掲示板に戻る</Link>
                </div>
            </section>
        </Fragment>
    )
}

export default Thread