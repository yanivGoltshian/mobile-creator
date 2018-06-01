import React, { Component } from 'react';
import ItemService from '../services/item.service';
import CreatorService from '../services/creator.service';
import './creator-screen.style.scss';
import SectionSelect from "./section-select.component";
import pubsub from 'pubsub-js';
import Navbar from "./navbar/navbar.component";
import ImageSection from './image-section';
import Spinner from './spinner.component';

const sectionsMap = {
    image: ImageSection,
};

export default class CreatorScreen extends Component {
    constructor(props) {
        super(props);
        this.subs = [];
        this.state = {
            sections: [
            ],
            uploading: false,
        };

        this.subs.push(pubsub.subscribe('section_media_uploading', () => {
            this.setState({
                uploading: true,
            });
        }));

        this.subs.push(pubsub.subscribe('sections_added', (event, { sections }) => {
            this.setState(prevState => ({
                sections: [...prevState.sections, ...sections],
                uploading: false,
            }));
            ItemService.setUrls(sections.map(section => section.url));
        }));

        this.onSave = this.onSave.bind(this);
        this.onPublish = this.onPublish.bind(this);
    }

    componentWillUnmount() {
        this.subs.forEach(sub => pubsub.unsubscribe(sub));
    }

    onSave() {
        const itemToSave = ItemService.getItemJson();
        CreatorService.save(itemToSave).then((response) => {
            console.log('response', response);
            window.location.href = "https://alpha.playbuzz.com/item/" + response.GameMetaData.GameId;
        });
    }

    onPublish() {
        const itemToSave = ItemService.getItemJson();
        CreatorService.save(itemToSave).then((response) => {
            console.log('response', response);
            window.location.href = "https://alpha.playbuzz.com/item/" + response.GameMetaData.GameId;
        });
    }

    renderSection(section) {
        const Section = sectionsMap[section.type];

        return (
            <div>
                <img className="img-list" src={'https://img.playbuzz.com/image/upload/c_crop/v1527807860/jdfkjo2qq8jc7psmenma.png'}></img>
                <Section className="section" key={section.id} section={section} />
            </div>
        );
    }

    render() {
        return (
            <div className="creator-screen">
                <Navbar onSave={this.onSave} onPublish={this.onPublish} />

                <div className="preview">
                    {this.state.uploading && <Spinner />}
                    <div className='story-title'>{ItemService.storyTitle}</div>
                    {this.state.sections.map(section => this.renderSection(section))}
                </div>

                <SectionSelect />
            </div>
        );
    }
}
