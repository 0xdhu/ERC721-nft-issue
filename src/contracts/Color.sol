// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Color is ERC721, ERC721Enumerable, Ownable {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {

    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _color) public onlyOwner{
        // require unique token
        require(!_colorExists[_color], "This token exists already");
        // mint token
        colors.push(_color);        
        uint _id = colors.length;

        safeMint(msg.sender, _id);
        // set flag as minted
        _colorExists[_color] = true;
    }
}
