import React from 'react';
import PropTypes from 'prop-types';
import GithubRepo from './GithubRepo/GithubRepo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const GithubRepos = (props) => {
    return props.repos.length === 0 ? null : <div className="profile-github">
        <h2 className="text-primary my-1">
            <FontAwesomeIcon icon={faGithub} /> Github Repos
          </h2>
          {
              props.repos.map(repo=> <GithubRepo 
                key={repo.id}
                repo={repo}
              />)
          }
    </div>
}

GithubRepos.propTypes = {
    repos: PropTypes.array.isRequired
}

export default GithubRepos;