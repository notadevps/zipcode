import styled from "styled-components";



const Card = ({ post }) => {
    return (
        <CardStyle>
            <div className='cardContainer'>
                <div className='countryDesc'>
                    <div><span className='heading'>Post code:</span> <span> {post['post code'] || 'NA'}</span></div>
                    <div><span className='heading'>Country:</span> <span> {post['country'] || 'NA'}</span></div>
                    <div><span className='heading'>Country Abbrevation:</span> <span>{post['country abbreviation'] || 'NA'}</span></div>
                </div>

                <div className='cards'>
                {post.places &&  post.places.length > 0 ? 
                    post.places.map(place => {
                        return (
                            <div className='card' 
                            onMouseOver={(e) => {
                                e.target.classList.add('cardClick');
                                console.log(e.target.classList);
                            }} 
                            onMouseOut={(e) => {
                                console.log('out');
                                if (e.target.classList.contains('cardClick')) {
                                    e.target.classList.remove('cardClick');
                                }
                            }}
                            onClick={(e) => {
                                window.open(`https://maps.google.com/?q=${place.latitude},${place.longitude}`, '_blank');
                            }}
                            >
                                <span>Place Name:  {place['place name'] || 'NA'}</span>
                                <span>State: {place['state'] || 'NA'}</span>
                                <span>State Abbreviation: {place['state abbreviation'] || 'NA'}</span>
                            </div>
                        )
                    })
                : <span>No places found!</span>}
                </div>
            </div>
        </CardStyle>
    )       
}
export default Card; 

const CardStyle = styled.div`
    .countryDesc {
        display: flex; 
        justify-content: space-between;
    }

    .cardContainer {
        padding-top: 3rem;
        width: 100%;
        display: flex; 
        flex-direction: column;
        gap: 4rem;
        white-space: break-spaces;
        
    }

    .cards {
        flex-wrap: wrap; 
        display: flex;
        gap: 3rem;
        justify-content: center;
    }

    .card {
        display: flex;
        flex-direction: column; 
        width: max-content;
        box-sizing: border-box;
        padding: 2rem; 
        font-weight: 300;
        box-shadow: 4px 4px 4px 0px rgb(0, 0, 0, 0.1), -4px -4px 4px 0px rgba(0, 0, 0, 0.1);
        gap: 1rem;
        font-size: 1.1rem;
        cursor: pointer; 
        width: 300px;
        justify-content: center;
        background-color: #252526;
        position: relative;
    }
  
    .heading {
        font-weight: 300;
    }

    .cardClick::after {
        width: 100%; 
        height: 100%; 
        position: absolute;
        content: "Click to view on map";
        left: 0%; 
        top: 0%;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        text-decoration: underline;
        color: #0398FC;
        background-color: rgba(0, 0, 0, 0.9);
    }


`;