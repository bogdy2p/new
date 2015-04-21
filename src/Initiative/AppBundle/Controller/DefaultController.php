<?php

namespace Initiative\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Form\FormBuilder;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Form\Extension\Csrf\CsrfExtension;
use Symfony\Component\Form\Extension\Csrf\CsrfProvider\SessionCsrfProvider;
use Symfony\Component\HttpFoundation\Cookie;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class DefaultController extends Controller {

    /**
     * @Template()
     * @Route("/dash",name="dash")
     */
    public function dashAction(Request $request) {

        $securityContext = $this->get('security.context');
        $token = $securityContext->getToken();
        $user = $token->getUser();

        $roles = $token->getRoles();

        $link_to_logout = $this->generateUrl('logout');
        return $this->render('InitiativeAppBundle:Default:indexold.html.twig', array('roles' => $roles, 'logout' => $link_to_logout, 'user'=> $user));
    }

    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction() {

        //If there is a cookie with the user's API KEY , consider him logged in and redirect him to the DASHBOARD.
        $dash_link = $this->generateUrl('dash');
        if (isset($_COOKIE['apikey'])) {
            return $this->redirect($dash_link);
        }

        //Else display him the login form 
        $link_to_login_page = $this->generateUrl('initiative_app_default_login');
        return array('login' => $link_to_login_page);
    }

    /**
     * @Route("/login")
     */
    public function loginAction(Request $request) {

        $template = array(
            'login_video' => 'video.mp4',
            'login_image' => 'unilever.png',
            'login_logo' => 'logo.png',
            'login_title' => 'Pbc Title'
            );
        
        
        $authenticationUtils = $this->get('security.authentication_utils');
        $error = $authenticationUtils->getLastAuthenticationError();
        return $this->render('InitiativeAppBundle:Default:Login/login.html.twig', array('error' => $error,'template' => $template));
    }

    /**
     * @Route("/login_check_api", name="login_check_api")
     */
    public function loginCheckApiAction(Request $request) {

        $client = new Client();
        try {
            $guzzle_response = $client->post('missioncontrol/users/authentication', [
                'body' => [
                    'username' => $request->get('username'),
                    'password' => $request->get('password')
                ]
            ]);
        } catch (ClientException $e) {

            if ($e->getResponse()->getStatusCode() == 400) {
                $authenticationUtils = $this->get('security.authentication_utils');
                $response_error_string = $e->getResponse()->getBody()->getContents();
                $response_error_array = json_decode($response_error_string, true);
                $response_error_message = $response_error_array['message'];
                $error = $response_error_message;
                return $this->render('InitiativeAppBundle:Default:login.html.twig', array('error' => $error));
            }
        }

        if ($guzzle_response->getStatusCode() == 201) {

            $response_string = $guzzle_response->getBody()->getContents();
            $response_array = json_decode($response_string, true);
            $apikey = $response_array['API_KEY'];

            $response = new Response();
            $time_to_live = 900; // 900 seconds (15 mins) After that should re-login ?
            $response->headers->setCookie(new Cookie("apikey", $apikey, time() + $time_to_live, '/', null, false, false));
            $response->send();

            return $this->redirect('dash');
        }
    }

    /**
     * @Route ("/logout", name="logout")
     */
    public function logoutAction(Request $request) {

        $response = new Response();
        $response->headers->clearCookie('apikey');
        $response->send();
        return $this->redirect($this->generateUrl('initiative_app_default_index'));
    }

    /**
     * @Route("/login_check", name="login_check")
     */
    public function loginCheckAction() {
        
    }

}
