import React from 'react'

const Welcome = () => {
    return (
        <div className='welcome'>
            <h2><strong>Les petits plus de Brainline</strong></h2>

            <div className='welcomeDiv'>
                <span className='welcomeSpan price'></span>
                <div className='priceTexts'>
                    <h4>Vos billets au meilleur prix</h4>
                    <p>Achetez vos billets aux prix fixés par les transporteurs, sans frais supplémentaires.</p>
                </div>
            </div>

            <div className='welcomeDiv'>
                <span className='welcomeSpan cardRed'></span>
                <div className='cardTexts'>
                    <h4>Cartes de réduction</h4>
                    <p>Elles sont toutes acceptées, comme vos cartes de fidélité.</p>
                </div>
            </div>

            <div className='welcomeDiv'>
                <span className='welcomeSpan pay'></span>
                <div className='payTexts'>
                    <h4>Payez en toute sécurité</h4>
                    <p>CB, Amex, PayPal : c’est vous qui voyez.</p>
                </div>
            </div>
        </div>
    )
}

export default Welcome