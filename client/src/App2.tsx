import axios from "axios";
function App2() {
  const handlePayment = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/payment");
      if (res && res.data) {
        window.location.href = res.data.links[1].href;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </>
  );
}
export default App2;
