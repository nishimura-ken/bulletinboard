import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link } from "react-router-dom"

type Thread = {
    id: string;
    title: string
}

const API_URL = "https://railway.bulletinboard.techtrain.dev/threads"

function Home() {
    const [threads, setThreads] = useState<Thread[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("スレッド情報の取得に失敗しました")
            }
            return response.json()
        })
        .then((data) => {
            setThreads(data)
        })
        .catch((error) => {
            setError(error.message)
        })
        .finally(() => { 
            setLoading(false)
        })
    }, [])
    
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
                <Link to="/threads/new">スレッドをたてる</Link>
            </header>
            <section id="center">
                <h4>新着スレッド</h4>
                { threads.length === 0 ? (
                    <p>スレッドがありません。</p>
                ) : ( 
                    <table>
                    <tbody> {threads.map((thread) => (
                        <tr key={thread.id}>
                        <td>{thread.title}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
            </section>
        </Fragment>
    )
}

export default Home