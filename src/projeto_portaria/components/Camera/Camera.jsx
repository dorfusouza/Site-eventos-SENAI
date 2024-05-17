import './CameraIcon.css'

const Camera = (props) =>
{
    return(
        <div>
            <img className='camera' src={props.camera} alt='Camera'/>
        </div>
    )
}

export default Camera;