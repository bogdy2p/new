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

class DefaultController extends Controller {

    /**
     * @Template()
     * @Route("/dash",name="dash")
     */
    public function dashAction(Request $request) {

        var_dump($request->headers);
        die();
        
        return $this->render('InitiativeAppBundle:Default:indexold.html.twig',array('cookies' => $_COOKIE)); 
        return new Response('Admin page !');
    }

    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction() {


        $link_to_login_page = $this->generateUrl('initiative_app_default_login');
        $link_to_logout = $this->generateUrl('logout');

        return array('login' => $link_to_login_page, 'logout' => $link_to_logout);

        $token = $this->get('security.context')->getToken();
        $roles = $token->getRoles();
    }

    /**
     * @Route("/login")
     */
    public function loginAction(Request $request) {

        $formFactory = $this->get('form.factory');

//        $form = $formFactory->createBuilder()
//                ->setAction($this->container->getParameter('apiURL') . '/users/authentication')
//                ->setMethod("POST")
//                ->add('username', 'text')
//                ->add('password', 'password')
//                ->add('submit', 'submit', array('label' => 'Submit'))
//                ->getForm();
////        
////
//        return $this->render('InitiativeAppBundle:Default:login.html.twig', array('form' => $form->createView()));
//        
        $formAction = $this->container->getParameter('apiURL') . '/users/authentication';
        $authenticationUtils = $this->get('security.authentication_utils');

        $error = $authenticationUtils->getLastAuthenticationError();

        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('InitiativeAppBundle:Default:login.html.twig', array('formaction' => $formAction, 'last_username' => $lastUsername, 'error' => $error));
    }

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
        
        try{
        $guzzle_response = $client->post('missioncontrol/users/authentication', [
            'body' => [
                'username' => $request->get('username'),
                'password' => $request->get('password')
            ]
        ]);
        } catch (Exception $e){
            die();
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
            die('IM DEAD');
        
    }

//    /**
//     * @Route ("/logout")
//     */
//    public function logoutAction() {
//
//        /// MAYBE SESSION DESTROY AND DELETE COOKIEZ ?
//    }
//    /**
//     * @Route ("/test")
//     */
//    public function testAction() {
//        var_dump($this->container);
//        die();
//
//
//        $formFactory = $this->get('form.factory');
//
//        $form = $formFactory->createBuilder()
//                ->setAction($this->container->getParameter('apiURL') . '/users/authentication')
//                ->setMethod("POST")
//                ->add('username', 'text')
//                ->add('password', 'password')
//                ->add('submit', 'submit', array('label' => 'Submit'))
//                ->getForm();
//        $this->render('InitiativeAppBundle:Default:login.html.twig', array('form' => $form->createView()));
//
//        $request = Request::createFromGlobals();
//
//        $form->handleRequest($request);
//
//        if ($form->isValid()) {
//            $data = $form->getData();
//            print_r($data);
//        }
//
//        $response = new RedirectResponse('#');
//        $response->prepare($request);
//
//        var_dump($request->request);
//        die();
//
//        return $response->send();
//    }
}
