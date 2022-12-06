import React, { Component } from 'react';
import PropTypes from 'prop-types'
import i18next from 'i18next';

class CMarkupParser extends Component {
    constructor(props) {
        super(props);
    }

    renderParagraphs = () => {
        let html = this.props.htmlString;
        if (!html) return [];
        let paragraphs = html.split("\n\n");
        return paragraphs.map(paragraph => {
          return this.renderParagraph(paragraph)
        })
    }
    renderParagraph = (paragraph) => {
        return <p>{this.renderTexts(paragraph)}</p>
    }
    renderBoldText = (text) => {
        return <b>{this.renderNormalText(text)}</b>
    }
    renderNormalText = (text) => {
        if(!text) return []
        let normalTexts = text.split('\n')
        if(normalTexts.length > 1) {
          return normalTexts.map((normalText, index) => {
            if(normalTexts.length > 1 && index < normalTexts.length - 1) {
              return <span>{normalText}<br/></span>
            } else {
              return normalText
            }
          })
        } else {
          return text
        }

    }
    renderTexts = (paragraph) => {
        let texts = paragraph.split("**");
        let boldTexts = texts.map((text, index) => {
          if (index > 0 && index < texts.length - 1) {
              return this.renderBoldText(text)
          } else {
              return this.renderNormalText(text)
          }
        })
        return boldTexts
    }

    render (){
        return <div>
          {this.renderParagraphs()}
        </div>
    }
}

CMarkupParser.propTypes = {
    htmlString: PropTypes.string
}

export default CMarkupParser