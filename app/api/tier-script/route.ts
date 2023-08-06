import { NextResponse } from "next/server";
import { exec, spawn } from "child_process";

export async function GET(request: Request) {
  const scriptPath = `tierlist-model.py`;
  let python = spawn('python', ['tierlist-model.py`']);
  let dataToSend = '';
  for await (const data of python.stdout){
    //console.log(data.toString());
    dataToSend += data.toString()
  }
  console.log("dataToSend", dataToSend);

  try {
    exec(`py /${scriptPath}`, (error, stdout, stderr) => {
      if (error) {

        console.log(error);
        return NextResponse.json(error, { status: 500 });
      }
      return NextResponse.json(
        {
          message: "Script executed successfully",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      { status: 400 }
    );
  }
}
