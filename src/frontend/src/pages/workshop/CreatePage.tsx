import Header from "../../components/Header";
import QuizCreateForm from "./quiz/QuizCreateForm";

const CreatePage = () => {
  return(
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-10">
          <h4 className="text-center">Give your quiz a name</h4>
        </div>
        <div className="flex justify-center items-center h-56">
          <QuizCreateForm />
        </div>
      </div>
    </>
  );
}

export default CreatePage;
