import Header from "../../components/Header";
import QuizCreateForm from "./quiz/QuizCreateForm";

const CreatePage = () => {
  return(
    <>
      <Header></Header>
      <h4 className="text-center mt-10">Give your quiz a name</h4>
      <div className="flex justify-center items-center h-56">
        <QuizCreateForm />
      </div>
    </>
  );
}

export default CreatePage;
