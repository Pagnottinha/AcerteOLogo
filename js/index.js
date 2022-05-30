function instructions()
{
    const instruction = document.getElementById("instructions")
    if (instruction) return

    const createIns = document.createElement('div');
    createIns.id = "instructions";
    createIns.className = "instructions";
    createIns.innerHTML = `   
        <h2>Como jogar?</h2>
        <p>
            Ao clicar em iniciar, aparecerá o nome de uma marca e quatro logos,
            e sendo assim, você deverá acertar o logo da marca!
        </p>
        <p>
            São 10 questões, e se responder rápido ganhará mais pontos.
        </p>
        <button onclick="back()">Voltar</button>
    `;
    document.body.appendChild(createIns);
}

function back()
{
    const instruction = document.getElementById("instructions")
    document.body.removeChild(instruction);
}