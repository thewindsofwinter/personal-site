import projectData from '../projects.json';

function Project(props) {
    let project = projectData[props.project];

    return (
        <a href={project.link}>
                <div className="project relative m-4">
                    <img className="absolute rounded-2xl z-0" src={project.image}></img>
                    <div className="absolute bottom-0 w-full h-2/3 bg-gray-800 text-white z-5 p-4 rounded-b-2xl">
                        <h3 className="text-3xl border-b-2">{project.title}</h3>
                        <p className="text-lg mt-4">{project.description}</p>
                    </div>
                </div>
            </a>
    );
}

export default Project;
