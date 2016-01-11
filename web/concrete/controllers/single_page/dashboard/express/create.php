<?php
namespace Concrete\Controller\SinglePage\Dashboard\Express;

use Concrete\Core\Express\Form\Validator;
use Concrete\Core\Page\Controller\DashboardPageController;

class Create extends DashboardPageController
{
    public function view($id = null)
    {
        $r = $this->entityManager->getRepository('\Concrete\Core\Entity\Express\Entity');
        $entity = $r->findOneById($id);
        if (!is_object($entity)) {
            $this->redirect('/dashboard/express');
        }
        $this->set('entity', $entity);
        $form = $entity->getForms()[0];
        $renderer = \Core::make('Concrete\Core\Express\Form\Renderer');
        $this->set('expressForm', $form);
        $this->set('renderer', $renderer);
    }

    public function submit($id = null)
    {
        $this->view($id);
        $r = $this->entityManager->getRepository('\Concrete\Core\Entity\Express\Form');
        $form = $r->findOneById($this->request->request->get('express_form_id'));
        if (is_object($form)) {
            $validator = new Validator($this->error, $this->request);
            $validator->validate($form);
            if (!$this->error->has()) {
                $express = \Core::make('express');
                $entity = $express->create($this->get('entity'));
                $express->saveFromRequest($form, $entity, $this->request);

                $this->flash('success', t('%s added successfully.', $this->get('entity')->getName()));
                $this->redirect('/dashboard/express/entries', $this->get('entity')->getId());
            }
        } else {
            throw new \Exception(t('Invalid form.'));
        }
    }
}
