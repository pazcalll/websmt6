// import React, { Component } from 'react';
import React, { Component } from 'react';
import Image from './Image';
class List extends Component {
render() {
    return (
        <div>
            <ol>
                <li>
                    Satu
                    <Image linkGambar='https://blogpictures.99.co/makanan-khas-indonesia-header.png' />
                </li>
                <li>
                    Dua
                    <Image linkGambar='https://awsimages.detik.net.id/community/media/visual/2020/07/21/sate.jpeg?w=700&q=90' />
                </li>
                <li>
                    Tiga
                    <Image linkGambar='https://www.indoindians.com/wp-content/uploads/2016/03/Sate-Ayam.jpg' />
                </li>
                <li>
                    Empat
                    <Image linkGambar='https://doyanresep.com/wp-content/uploads/2016/06/resep-soto-lamongan-2.jpg' />
                </li>
                
                {/* <li>
                    Satu
                    <Image linkGambar='https://s3-ap-southeast1.amazonaws.com/niomic/img/sample/food1.jpg' />
                </li>
                <li>
                    Dua
                    <Image linkGambar='https://s3-ap-southeast1.amazonaws.com/niomic/img/sample/nasipadang.jpg' />
                </li>
                <li>
                    Tiga
                    <Image linkGambar='https://s3-ap-southeast1.amazonaws.com/niomic/img/sample/sate.png' />
                </li>
                <li>
                    Empat
                    <Image linkGambar='https://s3-ap-southeast1.amazonaws.com/niomic/img/sample/sotolamongan.png' />
            </li> */}
            </ol>
        </div>
    );
}
}export default List;