import './style.css'
import Pesawatt from '../img/src/pesawat.png'

export default function LoadingSvg() {
    return (
        <>
            <div id='loading'>
                <div id='container'>
                    <div id="pesawat">
                        <img id="gambar" src={Pesawatt} />
                    </div>
                    <div id='box'>
                        <div><span>W</span> <span id='text'>isata</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}