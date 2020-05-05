import React from 'react';
import PropTypes from 'prop-types';

const GithubRepo = (props) => {
    const { repo } = props;

    return <div className="repo bg-white p-1 my-1">
        <div>
            <h4><a href={repo.html_url} target="_blank"
                rel="noopener noreferrer">Repo {repo.name}</a></h4>
            {
                repo.description && <p>{repo.description}</p>
            }
        </div>
        <div>
            <ul>
        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
        </div>
    </div>
}

GithubRepo.propTypes = {
    repo: PropTypes.object.isRequired
}

export default GithubRepo;