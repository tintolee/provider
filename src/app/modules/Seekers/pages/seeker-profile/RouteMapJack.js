import React, { useRef, useEffect, useState } from 'react';
import ImageSource from '../../../../components/Images/RouteMap/index';
import ArrowRight from './arrow-right';
import ArrowLeft from './arrow-left';
import ArrowDown from './arrow-down';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export default function RouteMapJack({ routeMap }) {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`${routeMap.id}/steps#${id}`);
  };

  const postsLength = routeMap?.posts?.items?.length;

  const calculateViewbox = (length) => {
    if (length === 0) {
      return 40;
    } else if (length === 1) {
      return 100;
    } else {
      const dynamicLength = length - 1;
      if (dynamicLength % 3 === 0) {
        return 100 + (dynamicLength / 3) * 160;
      } else if (dynamicLength % 3 === 2) {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 60);
      } else {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 110);
      }
    }
  };

  const calculateTransform = (x) => {
    if (x < 5) {
      return 0;
    } else {
      const multiplier = Math.floor((x - 2) / 3);
      return multiplier * 160;
    }
  };

  const staticPath = useRef();
  const pathRefs = useRef({});

  // store the number of path elements according the number of route map iterations
  // to render in the return function below
  const renderPaths = (length) => {
    // list to store each iterated path (default to 1 if 5 or less posts)
    let paths = [];

    // for each iteration, dynamically render a path, with a unique 'ref' and 'transform' property
    for (let i = 1; i <= length; i++) {
      if (i === 1) {
        paths.push(
          <path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className='cls-0'
            d='M50,20H170a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157'
          />
        );
      } else if ((i - 1) % 3 === 0) {
        paths.push(
          <path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className='cls-3'
            d='M108,180h62a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157'
            transform={`translate(0 ${calculateTransform(i, length)})`}
          />
        );
      } else if ((i - 1) % 3 === 2) {
        paths.push(
          <path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className='cls-2'
            d='M60,130v20a30,30,0,0,0,30,30h18'
            transform={`translate(0 ${calculateTransform(i)})`}
          />
        );
      } else {
        paths.push(
          <path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className='cls-1'
            d='M157,80H90a30,30,0,0,0-30,30v20'
            transform={`translate(0 ${calculateTransform(i)})`}
          />
        );
      }
    }
    return paths;
  };

  const paths = renderPaths(postsLength);

  const renderSteps = (length, pathRefs) => {
    let sortedPosts = routeMap?.posts?.items?.slice()?.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    let list = { steps: [], images: [], uses: [], dates: [] };

    const addStep = (point, i) => {
      if (sortedPosts?.[i]?.type === 'PHOTO') {
        list.steps.push(
          <>
            <g
              className='blog-group'
              onClick={() => handleClick(sortedPosts?.[i]?.id)}
            >
              <circle
                className=''
                cx={point?.x}
                cy={point?.y}
                r={15}
                fill={`#f89534`}
                style={{ position: 'relative', zIndex: '-10' }}
                transform={`translate(0 ${calculateTransform(i)})`}
              />
              <circle
                className=''
                cx={point?.x}
                cy={point?.y}
                r={15}
                fill={`url(#image${i})`}
                transform={`translate(0 ${calculateTransform(i)})`}
              />
            </g>
          </>
        );
      } else if (sortedPosts?.[i]?.type === 'VIDEO') {
        list.steps.push(
          <circle
            onClick={() => handleClick(sortedPosts?.[i]?.id)}
            className='image-circle video-circle'
            cx={point?.x}
            cy={point?.y}
            r={15}
            transform={`translate(0 ${calculateTransform(i)})`}
          />
        );
      } else if (sortedPosts?.[i]?.blog) {
        list.steps.push(
          <g
            className='blog-group'
            onClick={() => handleClick(sortedPosts?.[i]?.id)}
          >
            <circle
              className='blog-circle'
              cx={point?.x}
              cy={point?.y}
              r={15}
              fill={`#f89534`}
              transform={`translate(0 ${calculateTransform(i)})`}
            />
            <circle
              className={sortedPosts?.[i]?.photo ? null : 'blog-circle'}
              cx={point?.x}
              cy={point?.y}
              r={15}
              transform={`translate(0 ${calculateTransform(i)})`}
              fill={sortedPosts?.[i]?.photo ? `url(#image${i})` : null}
            />
            <text
              className='blog-text'
              x={point?.x}
              y={point?.y + 1}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline='middle'
              text-anchor='middle'
            >
              {sortedPosts?.[i]?.blog?.blogTitle[0]}
            </text>
          </g>
        );
      } else if (
        sortedPosts?.[i]?.type === 'MILESTONE' &&
        !sortedPosts?.[i]?.photo
      ) {
        list.steps.push(
          <g
            className='blog-group'
            onClick={() => handleClick(sortedPosts?.[i]?.id)}
          >
            <circle
              className='blog-circle milestone'
              cx={point?.x}
              cy={point?.y}
              r={18}
              transform={`translate(0 ${calculateTransform(i)})`}
            />
            <text
              className='blog-text'
              x={point?.x}
              y={point?.y + 1}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline='middle'
              text-anchor='middle'
            >
              {sortedPosts?.[i]?.caption?.[0]}
            </text>
          </g>
        );
      } else if (
        sortedPosts?.[i]?.type === 'MILESTONE' &&
        sortedPosts?.[i]?.photo
      ) {
        list.steps.push(
          <g
            className='blog-group'
            onClick={() => handleClick(sortedPosts?.[i]?.id)}
          >
            <circle
              className='blog-circle'
              cx={point?.x}
              cy={point?.y}
              r={18}
              fill={`#f89534`}
              transform={`translate(0 ${calculateTransform(i)})`}
            />
            <circle
              className='blog-image milestone'
              cx={point?.x}
              cy={point?.y}
              r={18}
              transform={`translate(0 ${calculateTransform(i)})`}
              fill={`url(#image${i})`}
            />
            <text
              className='blog-text'
              x={point?.x}
              y={point?.y + 1}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline='middle'
              text-anchor='middle'
            >
              {sortedPosts?.[i]?.caption?.[0]}
            </text>
          </g>
        );
      } else if (i === length) {
        if (i === 0 || i === 3) {
          list.images.push(<ArrowRight />);
        } else if (i === 1) {
          list.images.push(<ArrowLeft />);
        } else if (i === 2) {
          list.images.push(<ArrowDown />);
        } else if (i % 3 === 0) {
          list.images.push(<ArrowRight />);
        } else if (i % 3 === 1) {
          list.images.push(<ArrowLeft />);
        } else if (i % 3 === 2) {
          list.images.push(<ArrowDown />);
        }
        list.uses.push(
          <use
            x={point?.x - 8}
            y={point?.y - 8}
            transform={`translate(0 ${calculateTransform(i)})`}
            xlinkHref='#arrow'
          />
        );
      }
    };
    const addImage = (i) => {
      list.images.push(
        <pattern
          id={`image${i}`}
          x='0%'
          y='0%'
          height='1'
          width='1'
          patternContentUnits='objectBoundingBox'
        >
          <ImageSource photo={sortedPosts?.[i]} />
        </pattern>
      );
    };
    const addDate = (point, i) => {
      const pushDate = (x, y) =>
        list.dates.push(
          <text
            className='type text-muted'
            x={point?.x + x}
            y={point?.y + y}
            transform={`translate(0 ${calculateTransform(i)})`}
            dominant-baseline='middle'
            text-anchor='middle'
          >
            {sortedPosts?.[i]?.type
              .toLowerCase()
              .charAt(0)
              .toUpperCase() + sortedPosts?.[i]?.type.toLowerCase().slice(1)}
          </text>,
          <text
            className='date text-muted'
            x={point?.x + x}
            y={point?.y + y + 5}
            transform={`translate(0 ${calculateTransform(i)})`}
            dominant-baseline='middle'
            text-anchor='middle'
          >
            {moment(sortedPosts?.[i]?.createdAt).format('DD MMM')}
          </text>
        );

      if (i === 0 || i === 1 || i === 3 || i % 3 === 0 || i % 3 === 1) {
        pushDate(0, 25);
      } else if (i === 2 || i % 3 === 2) {
        pushDate(-35, 0);
      }
    };

    const staticRoute = staticPath?.current;
    const staticRouteLength = staticRoute?.getTotalLength();
    const firstPoint = staticRoute?.getPointAtLength(staticRouteLength);

    addStep(firstPoint, 0);
    addImage(0);
    addDate(firstPoint, 0);

    for (let i = 1; i <= length; i++) {
      const route = pathRefs?.current[i];
      const routeLength = route?.getTotalLength();
      const point = route?.getPointAtLength(routeLength);
      addStep(point, i);
      if (i !== length) {
        addDate(point, i);
      }
      if (sortedPosts?.[i]?.photo) {
        addImage(i);
      }
    }

    return list;
  };

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    setSteps(renderSteps(postsLength, pathRefs));
  }, []);

  return (
    <div className='wrapper'>
      <svg
        id='routemap-svg'
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 241 ${calculateViewbox(postsLength)}`}
      >
        {paths ? paths : null}
        <line ref={staticPath} className='cls-1' y1='20' x2='50' y2='20' />
        <defs>
          {steps.images?.map((step) => {
            return step;
          })}
        </defs>
        {steps.dates?.map((step) => {
          return step;
        })}
        {steps.steps?.map((step) => {
          return step;
        })}
        {steps.uses?.map((step) => {
          return step;
        })}
      </svg>
    </div>
  );
}
