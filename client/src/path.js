const local = true;

const PATH = () => {
  return local
    ? "http://localhost:3001"
    : "https://miturno-cruce.herokuapp.com/";
};

export default PATH;
