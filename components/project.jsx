import Image from 'next/image'
import projectData from '../projects.json';

function Badge(props) {
    let type = props.type;

    switch(type) {
        case 0:
            return (
                <span className="float-right text-sm bg-teal-600 p-1 m-1 mr-0 rounded-lg">Actively Maintained</span>
            );
        case 1:
            return (
                <span className="float-right text-sm bg-amber-600 p-1 m-1 mr-0 rounded-lg">Handed to New Maintainer</span>
            );
        case 2:
            return (
                <span className="float-right text-sm bg-lime-600 p-1 m-1 mr-0 rounded-lg">Actively Developing</span>
            );
        default:
            return (
                <span className="float-right text-sm bg-blue-600 p-1 m-1 mr-0 rounded-lg">Planning/Prototyping</span>
            );

    }
}

function Project(props) {
    let project = projectData[props.project];
    let height = 400 * project.h / project.w;

    if(props.small) {
        height = 288 * project.h / project.w;

        return (
            <a href={project.link}>
                <div className="project-small relative m-4 rounded-2xl hover:shadow-md">
                    <Image className="absolute rounded-2xl z-0" 
                        src={project.image} 
                        alt={project.alt}
                        width={288}
                        height={height}
                    />
                    <div className="absolute bottom-0 w-full h-3/4 bg-gray-800 text-white z-5 p-4 rounded-b-2xl">
                        <h3 className="block text-2xl border-b-2">{project.title}</h3>
                        <Badge type={project.type} />
                        <p className="pt-4 clear-right">{project.description}</p>
                    </div>
                </div>
            </a>
        )
    }

    return (
        <a href={project.link}>
                <div className="project relative m-4 rounded-2xl hover:shadow-md">
                    <Image className="absolute rounded-2xl z-0" 
                        src={project.image} 
                        alt={project.alt}
                        width={400}
                        height={height}
                    />
                    <div className="absolute bottom-0 w-full h-2/3 bg-gray-800 text-white z-5 p-4 rounded-b-2xl">
                        <h3 className="block text-3xl border-b-2">{project.title} <Badge type={project.type} /></h3>
                        <p className="text-lg mt-4">{project.description}</p>
                    </div>
                </div>
            </a>
    );
}

function ProjectList(props) {
    return (
        <div className="flex-grow splash flex flex-row flex-wrap justify-center items-center w-4/5 mx-auto mt-8 text-white">
            <Project project="ANIMA" small={props.small} />
            <Project project="USNCO" small={props.small} />
            <Project project="JHMC" small={props.small} />
            <Project project="Multi24" small={props.small} />
            <Project project="Azimuth" small={props.small} />
            <Project project="Fortune-ate" small={props.small} />
        </div>
    )
}

export default ProjectList;
