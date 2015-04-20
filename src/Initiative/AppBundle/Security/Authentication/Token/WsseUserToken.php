<?php

namespace Initiative\AppBundle\Security\Authentication\Token;

use Symfony\Component\Security\Core\Authentication\Token\AbstractToken;

/**
 * Description of WsseUserToken
 *
 * @author pbc
 */
class WsseUserToken extends AbstractToken {

    public $created;
    public $digest;
    public $nonce;

    public function __construct(array $roles = array()) {
        parent::__construct($roles);
        // If the user has roles , he is authenticated.
        $this->setAuthenticated(count($roles) > 0);
    }

    public function getCredentials() {
        return '';
    }

}
