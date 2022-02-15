export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    //? We want to handle the errors in "model.js" not "getJson()",therefore we have to rethrow the error here, then the promise that will return from "getJson()" will be rejected, then we will be able to handle the error in "model.js", so besically the error propagates down from the async function "getJson()" to the other in "model.js" by rethrowing the error in the "catch" block.
    console.log(err);
    throw err;
  }
};
