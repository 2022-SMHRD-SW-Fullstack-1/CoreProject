import * as React from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../css/PostCode.css'

const PostCode = (props)  => {
    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        props.setcompany({
            ...props.company,
            address:fullAddress,
        })

        props.setzone(data.zonecode)
    }

    return (
        <div >
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} />
                
        </div>
    );
};
export default PostCode;