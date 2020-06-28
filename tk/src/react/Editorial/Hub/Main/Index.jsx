import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { componentPropTypes } from '../proptypes';
import getComponent from './getComponent';
import { useMqlMobile } from '../../../hooks/useMql';

const EditorialHub = ({ components }) => {
  const isMobile = useMqlMobile();
  return (
    <Fragment>
      <h1 className="editorial-hub__h1">
        Voices
      </h1>
      {components.map((component) => {
        const Component = getComponent(component.componentType);
        return (
          <Component
            {...component}
            isMobile={isMobile}
            key={component.componentContainerId}
          />
        );
      })}
    </Fragment>
  );
};

EditorialHub.defaultProps = {
  components: []
};

EditorialHub.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape(componentPropTypes))
};

export { EditorialHub };
