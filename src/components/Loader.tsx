import loadingApi from "../images/loading.gif"
const Loader = () => {
  const styles = {
    display:"flex",
    justifyContent:"center"
  }
  return (
   <div style={styles} className="py-48">
     <img src={loadingApi} alt="" className="w-12"/>
   </div>
  )
}

export default Loader