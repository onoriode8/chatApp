import "./beneficiary.css";


const beneficiary = ({setNarration}) => (
    <div className="beneficiary_wrapper">
        <div className="beneficiary_icon_wrapper">
            <span>icon</span>
            <div>select from Beneficiary</div>
        </div>
        <div>
            <p>Narration</p>
            <div className="beneficiary_narration_input_wrapper">
                <input type="text" onChange={setNarration} placeholder="Enter Narration" />
            </div>
        </div>
    </div>
);

export default beneficiary;