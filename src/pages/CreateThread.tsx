import { useState } from 'react'
import { Fragment } from 'react'
import { Link, useNavigate } from "react-router-dom"

const API_URL = "https://railway.bulletinboard.techtrain.dev/threads"

function CreateThread() {

    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const createClick = async function(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if ( !title.trim() ) {
            alert("タイトルを入力してください")
            return
        }
        try {
            setLoading(true)
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                title: title,
                }),
            })

            if ( !response.ok ) {
                throw new Error("スレッドの作成に失敗しました");
            }

            // スレッド作成後はスレッド一覧へ
            navigate("/")

        } catch (error) {
            console.error(error);
            alert("スレッドの作成に失敗しました");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <header>
                <h3>掲示板</h3>
                <Link to="/threads/new">スレッドをたてる</Link>
            </header>
            <section id="center">
                <form onSubmit={createClick}>
                    <h4>スレッド新規作成</h4>
                    <input 
                        type="text" 
                        value={title} 
                        placeholder="スレッドタイトル"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <div className='bottom'>
                        <Link to="/">掲示板に戻る</Link>
                        <button type="submit" disabled={loading}>
                            {loading ? "作成中..." : "作成"}
                        </button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default CreateThread;
