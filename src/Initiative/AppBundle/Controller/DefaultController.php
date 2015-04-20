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

        print_r($this->get('security.context')->getToken()->getRoles());
//        print_r($this->get('security.context')->getToken()->getUser()->getRoles());
        die();
        return $this->render('InitiativeAppBundle:Default:indexold.html.twig', array('cookies' => $_COOKIE));
    }

    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction() {


        $link_to_login_page = $this->generateUrl('initiative_app_default_login');
        $link_to_logout = $this->generateUrl('logout');

        return array('login' => $link_to_login_page, 'logout' => $link_to_logout);

    }

    /**
     * @Route("/login")
     */
    public function loginAction(Request $request) {

        
        //Clear cookies here :)
        //Clear cookies here :) <Or , if already logged in , redirect to the dashboard ? :) >
        //Clear cookies here :)
        
        $formFactory = $this->get('form.factory');
        $formAction = $this->container->getParameter('apiURL') . '/users/authentication';
        $authenticationUtils = $this->get('security.authentication_utils');
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('InitiativeAppBundle:Default:login.html.twig', array('formaction' => $formAction, 'last_username' => $lastUsername, 'error' => $error));
    }
//
    /**
     * @Route("/login_check", name="login_check")
     */
    public function loginCheckAction() {
        
    }

    /**
     * @Route("/login_check2", name="login_check2")
     */
    public function loginCheck2Action(Request $request) {

        //AICI FACEM VERIFICAREA DACA EXISTA USERUL ( CALL CATRE API USERS AUTHENTICATION , SI PRIMIM API KEY

        $client = new Client();

        try {
            $guzzle_response = $client->post('missioncontrol/users/authentication', [
                'body' => [
                    'username' => $request->get('username'),
                    'password' => $request->get('password')
                ]
            ]);
        } catch (ClientException $e) {
            echo $e->getRequest();
            echo $e->getResponse()->getStatusCode();

            if ($e->getResponse()->getStatusCode() == 400) {
                return $this->redirect('login');
            }
        }

        if ($guzzle_response->getStatusCode() == 201) {

            $response_string = $guzzle_response->getBody()->getContents();
            $response_array = json_decode($response_string, true);
            $apikey = $response_array['API_KEY'];

            $response = new Response();
            $response->headers->setCookie(new Cookie("apikey", $apikey));
            $response->send();

            return $this->redirect('dash');
        }
    }

    /**
     * @Route ("/logout")
     */
    public function logoutAction() {

        /// MAYBE SESSION DESTROY AND DELETE COOKIEZ ?
    }
}
