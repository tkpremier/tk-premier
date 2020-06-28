import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import convert from 'react-attr-converter';
import { parse } from 'style-attr';
import camelCase from 'lodash/camelCase';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import { componentDataPropTypes } from './proptypes';
import { showModal } from '../PhillipsModal/actions';

const GalleryModalLink = (props) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(showModal({
      width: 980,
      height: 613,
      name: 'GalleryView',
      type: 'iframe',
      src: props.href,
      title: `GalleryView - ${e.target.dataset.id}`
    }));
  };
  return (
    <a href={props.href} className={props.className} onClick={handleClick}>
      {props.children}
    </a>
  );
};

const getStyleProp = (str) => {
  const parsed = parse(str);
  return Object.keys(parsed).reduce((obj, key) => {
    obj[camelCase(key)] = parsed[key];
    return obj;
  }, {});
};

const getProps = el => el.getAttributeNames().reduce((obj, attrName) => {
  const key = convert(attrName);
  const value = key === 'style'
    ? getStyleProp(el.getAttribute(key))
    : el.getAttribute(attrName);
  obj[key] = value;
  return obj;
}, { className: el.className });

export const createReactNode = (el) => {
  const children = el.hasChildNodes() ? [] : null;
  const elProps = el.nodeType === 1
    ? getProps(el)
    : null;
  if (el.hasChildNodes()) {
    const childNodesArray = Array.from(el.childNodes);
    childNodesArray.forEach((child) => {
      const grandChildren = [];
      if (child.hasChildNodes()) {
        const grandKidsNodesArray = Array.from(child.childNodes);
        grandKidsNodesArray.forEach((gChild) => {
          grandChildren.push(createReactNode(gChild));
        });
      }
      const nodeName = child.nodeType === 1
        ? child.nodeName.toLowerCase() === 'a' && child.className.indexOf('phillips-gallery-embed-link') > -1
          ? GalleryModalLink
          : child.nodeName.toLowerCase()
        : false;
      if (nodeName) {
        const childProps = getProps(child);
        const reactEl = grandChildren.length > 0
          ? createElement(nodeName, childProps, grandChildren)
          : createElement(nodeName, childProps);
        children.push(reactEl);
      } else if (child.nodeType === 3) {
        children.push(child.textContent);
      }
    });
  }
  const nodeName = el.nodeType === 1
    ? el.nodeName.toLowerCase() === 'a' && el.className.indexOf('phillips-gallery-embed-link') > -1
      ? GalleryModalLink
      : el.nodeName.toLowerCase()
    : null;
  return el.nodeType === 1
    ? createElement(nodeName, elProps, children)
    : el.nodeType === 3
      ? el.textContent
      : null;
};

const PhillipsDangerous = (props) => {
  const { className, componentId, htmlCaption } = props;
  const ref = useRef(null);
  const [children, setChildren] = useState([]);
  useEffect(() => {
    if (!isNull(ref.current)) {
      const reactNodesPromise = () => new Promise((resolve, reject) => {
        try {
          resolve(createReactNode(ref.current));
        } catch (e) {
          reject(e);
        }
      });
      reactNodesPromise()
        .then(res => setChildren([res]))
        .catch(err => console.log('reactNodesPromise error: ', err));
    }
  }, [componentId]);
  return children.length > 0
    ? <Fragment>{children}</Fragment>
    : (
      <div
        className={`phillips-dangerous ${className}`}
        dangerouslySetInnerHTML={{
          __html: htmlCaption
        }}
        ref={ref}
      />
    );
};
PhillipsDangerous.defaultProps = {
  className: ''
};

PhillipsDangerous.propTypes = {
  ...componentDataPropTypes,
  className: PropTypes.string
};

export default PhillipsDangerous;
