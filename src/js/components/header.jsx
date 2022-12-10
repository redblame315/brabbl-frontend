import React from 'react';
import PropTypes from 'prop-types';
import UserLogin from './login';
import i18next from 'i18next';

let Header = (props) => {
  let { currentView, isVisible, customer, user } = props;
  let headline;
  if (currentView === 'detail') {
    headline = i18next.t('DISCUSSION');
  }
  //TODO:Headline for News [Blame 12/08]
  else if(currentView === 'news') 
  {
    headline = i18next.t('News Discussions');
  }
  else if (props.discussion_list && props.discussion_list.name) {
    headline = props.discussion_list.name;
  } else {
    headline = i18next.t('All discussions'); 
  }

  if (!user && customer && customer.is_private) {
    headline = ''
  }
  
  if (!isVisible) {
    return <div />;
  } else {
    return (
      <div className="discussion-navigation-bar">
        <h1>{ headline }</h1>
        <UserLogin {...props} />
      </div>
    );
  }
};

Header.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  discussion: PropTypes.object,
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentView: PropTypes.string.isRequired,
  translators: PropTypes.object,
};

export default Header;
