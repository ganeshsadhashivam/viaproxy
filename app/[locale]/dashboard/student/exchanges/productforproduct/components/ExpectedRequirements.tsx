import { useFormContext } from "../component/FormContext";

export default function Page() {
  const { handleBack } = useFormContext();
  return (
    <div>
      <div>
        <div>
          <h3>Material conditions of the exchange</h3>
        </div>
        <div>
          Estimated value of the exchange <input type="text" />
        </div>
        <div>
          <p>
            deposit payement of booking Yes / No if yes{" "}
            <input type="text" id="depositpayment" />
            <label htmlFor="depositpayment">%</label>
          </p>
        </div>
        <div>
          <p>other Contigent Coverage Required</p>
          <textarea name="" id=""></textarea>
        </div>
        <div>
          <p>money back Gurantee Yes / NO</p>
          <p>Satisfaction or Exchanged Guarantee Yes / NO</p>
          <label htmlFor="desiredpaymentform">
            Desired Payement Form
            <select name="desiredpaymentform" id="desiredpaymentform">
              <option value="exchange with addtional sum">
                Exchange +/- Additional Sum
              </option>
              <option value="exchange with serive">
                Exchange +/- Benefit or Service
              </option>
            </select>
          </label>
          <label htmlFor="desiredpaymentform">
            Desired Payement Type
            <select name="desiredpaymenttype" id="desiredpaymenttype">
              <option value="Handtohandexchange">Hand to hand Exchange</option>
              <option value="Exchange payment before delivery">
                Exchange & Payement before Delivery
              </option>
              <option value="Exchange payment after delivery">
                Exchange & Payement after Delivery
              </option>
            </select>
          </label>
        </div>
        <div>
          <h4>Delivery conditions</h4>
          <p>Pickup Yes / No</p>
          <p>Pickup Address </p>
          <p>country</p>
          <p>city</p>
          <p>campus</p>
        </div>
        <div>
          <h4>Delivery</h4>
          <p>
            Delivery YES-NO (if yes) Delivery costs YES-NO (If yes), what is the
            amount: €.....................
          </p>
        </div>
      </div>
      <div>
        <p>Geolocation of the transaction</p>
        <p>Geolocation of the Campus Country Offer</p>
      </div>
      <div>
        other special conditions
        <p>Additional description of the payment or delivery methods</p>
      </div>
      <button onClick={handleBack}>back</button>
    </div>
  );
}
