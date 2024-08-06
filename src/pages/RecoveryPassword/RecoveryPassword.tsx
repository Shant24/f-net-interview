import AuthFormSteps from "@/components/AuthFormSteps";
import RecoveryPasswordEmailForm from "./components/RecoveryPasswordEmailForm";
import RecoveryPasswordNewPasswordForm from "./components/RecoveryPasswordNewPasswordForm";

const RecoveryPassword = () => {
  return <AuthFormSteps renderComponents={[RecoveryPasswordEmailForm, RecoveryPasswordNewPasswordForm]} />;
};

export default RecoveryPassword;
