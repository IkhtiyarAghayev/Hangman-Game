export default function Buttons({ getLetter, setDisabled, removeDisabled }) {
    let letters = [];
    for (let i = 97; i < 123; i++) {
        letters.push(String.fromCharCode(i))
    }
    return (
        <>
            {
                letters.map((letter => {
                    return <button onClick={(e) => { getLetter(e.target.innerText); setDisabled(e.target); }} key={letter} disabled={removeDisabled}> {letter}</button >;
                }))
            }
        </>
    )
}