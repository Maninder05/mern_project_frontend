export default function myImage()
{
    const path = "./pics/colorful-sunset.jpg";
    const path2="https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703548800&semt=sph";
    //Open image in new tab and copy it's path
    return(
        <img src={path} width={200} height="150" alt="" />
    )
}