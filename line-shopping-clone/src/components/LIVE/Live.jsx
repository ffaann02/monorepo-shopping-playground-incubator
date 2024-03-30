import { useContext } from "react"
import { useUserContext } from "../../contexts/UserContext"

const Live = () => {
    const {userProfile} = useUserContext();
  return (
    <div>Live</div>
  )
}
export default Live