export default function GameState({gameState, color}) {
    return (
        <section className='gameState'>
            <h2 className="game-state-heading" style={{color: color}}>{gameState}</h2>
        </section>
    )
}