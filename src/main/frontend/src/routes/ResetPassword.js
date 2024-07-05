import ResetPasswordForm from '../components/LogIn/ResetPasswordForm'
import Background from "../components/Background"

function ResetPassword(){
    return (
      <>
        <Background name={"비밀번호 재설정"} contents={<ResetPasswordForm/ >}/>
      </>
    );
}

export default ResetPassword