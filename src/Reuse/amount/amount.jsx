// import { useState } from 'react';


import SmallButton from '../buttons/smallButton/smallButton';


import './amount.css';


const Amount = ({ amount, setAmount, amountValue }) => {
    // const [amount, setAmount] = useState(0.0);


    const oneThousandButtonHandler = () => {
        const money = 1000.00;
        const formattedToString = money.toLocaleString();
        setAmount(formattedToString);
    }

    const twoThousandButtonHandler = () => {
        const money = 2000.00;
        const formattedToString = money.toLocaleString();
        setAmount(formattedToString);
    }
    
    const threeThousandButtonHandler = () => {
        const money = 3000.00;
        const formattedToString = money.toLocaleString();
        setAmount(formattedToString);
    }

    const fourThousandButtonHandler = () => {
        const money = 4000.00;
        const formattedToString = money.toLocaleString();
        setAmount(formattedToString);
    }

    const fiveThousandButtonHandler = () => {
        const money = 5000.00;
        const formattedToString = money.toLocaleString();
        setAmount(formattedToString);
    };

    return (
        <div className="amount_wrapper">
            <p>Amount</p>
            <div className="amount_naira_wrapper">
                {/* <div>NGN</div> */}
                {amount === 0 ? <input type="number" placeholder="NGN 0" /> : null}
                {amount !== 0 ? <div className="amount_amount">NGN {amount}</div>: null}
            </div>
            {amountValue && <p className="amount_p">enter an amount to proceed.</p>}
            <div className='amount_smallButton_wrapper'>
                <SmallButton title="1,000.00" click={oneThousandButtonHandler} />
                <SmallButton title="2,000.00" click={twoThousandButtonHandler} />
                <SmallButton title="3,000.00" click={threeThousandButtonHandler} />
                <SmallButton title="4,000.00" click={fourThousandButtonHandler} />
                <SmallButton title="5,000.00" click={fiveThousandButtonHandler} />
            </div>
        </div>
    )
};

export default Amount;