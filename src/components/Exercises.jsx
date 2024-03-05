import { Link } from "react-router-dom";
const list = ["PLANK", "SITUP"];

export default function App() {
    return (
        <>
        {list.map((item, index) => {
            return (
                <li key={index}>
                    <Link to={`/${item}`}>{item}</Link>
                </li>
            )

        })}
        </>
    )
}