
console.log("hello");


async function getData() 
{
    const content =document.getElementById('content');
    console.log("==============FETCH8888==================="); 
    try 
    {
        const response = await fetch(`http://localhost:3000` );

        if(!response.ok)
            throw new Error(`failed to get Data: ${response.statusText}`);
        const data = await response.json();
        console.log(data); 
   

    }
    catch(error)
    {
        

    }
}
getData()